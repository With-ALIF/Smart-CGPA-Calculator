CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  total_semesters INT DEFAULT 8,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON public.users;
CREATE POLICY "Users can read own profile" ON public.users FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Create trigger to automatically insert a user on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, total_semesters)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    8
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE TABLE IF NOT EXISTS public.semester_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  semester_no INT NOT NULL CHECK (semester_no BETWEEN 1 AND 8),
  semester_gpa NUMERIC(3,2) DEFAULT 0.00 CHECK (semester_gpa >= 0.00 AND semester_gpa <= 4.00),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, semester_no)
);

ALTER TABLE public.semester_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own semester results" ON public.semester_results;
CREATE POLICY "Users can read own semester results" ON public.semester_results FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own semester results" ON public.semester_results;
CREATE POLICY "Users can insert own semester results" ON public.semester_results FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own semester results" ON public.semester_results;
CREATE POLICY "Users can update own semester results" ON public.semester_results FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own semester results" ON public.semester_results;
CREATE POLICY "Users can delete own semester results" ON public.semester_results FOR DELETE USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.semester_subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  semester_result_id UUID REFERENCES public.semester_results(id) ON DELETE CASCADE NOT NULL,
  subject_name TEXT NOT NULL CHECK (char_length(trim(subject_name)) > 0),
  credit NUMERIC(3,2) NOT NULL CHECK (credit > 0),
  grade_point NUMERIC(3,2) NOT NULL CHECK (grade_point >= 0.00 AND grade_point <= 4.00),
  quality_point NUMERIC(5,2) GENERATED ALWAYS AS (credit * grade_point) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.semester_subjects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own subjects" ON public.semester_subjects;
CREATE POLICY "Users can read own subjects" ON public.semester_subjects 
FOR SELECT USING (EXISTS (SELECT 1 FROM public.semester_results WHERE id = semester_subjects.semester_result_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can insert own subjects" ON public.semester_subjects;
CREATE POLICY "Users can insert own subjects" ON public.semester_subjects 
FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.semester_results WHERE id = semester_result_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can update own subjects" ON public.semester_subjects;
CREATE POLICY "Users can update own subjects" ON public.semester_subjects 
FOR UPDATE USING (EXISTS (SELECT 1 FROM public.semester_results WHERE id = semester_subjects.semester_result_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can delete own subjects" ON public.semester_subjects;
CREATE POLICY "Users can delete own subjects" ON public.semester_subjects 
FOR DELETE USING (EXISTS (SELECT 1 FROM public.semester_results WHERE id = semester_subjects.semester_result_id AND user_id = auth.uid()));

CREATE OR REPLACE FUNCTION public.update_semester_totals()
RETURNS trigger AS $$
DECLARE
  v_semester_result_id UUID;
  v_total_credit NUMERIC(5,2);
  v_total_quality_points NUMERIC(6,2);
  v_semester_gpa NUMERIC(3,2);
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_semester_result_id := OLD.semester_result_id;
  ELSE
    v_semester_result_id := NEW.semester_result_id;
  END IF;

  SELECT 
    COALESCE(SUM(credit), 0), 
    COALESCE(SUM(quality_point), 0)
  INTO v_total_credit, v_total_quality_points
  FROM public.semester_subjects
  WHERE semester_result_id = v_semester_result_id;

  IF v_total_credit > 0 THEN
    v_semester_gpa := ROUND(v_total_quality_points / v_total_credit, 2);
  ELSE
    v_semester_gpa := 0.00;
  END IF;

  UPDATE public.semester_results
  SET 
    semester_gpa = v_semester_gpa,
    updated_at = NOW()
  WHERE id = v_semester_result_id;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_semester_totals ON public.semester_subjects;
CREATE TRIGGER trigger_update_semester_totals
  AFTER INSERT OR UPDATE OR DELETE ON public.semester_subjects
  FOR EACH ROW EXECUTE PROCEDURE public.update_semester_totals();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_semester_results_updated_at ON public.semester_results;
CREATE TRIGGER set_semester_results_updated_at
  BEFORE UPDATE ON public.semester_results
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

DROP TRIGGER IF EXISTS set_semester_subjects_updated_at ON public.semester_subjects;
CREATE TRIGGER set_semester_subjects_updated_at
  BEFORE UPDATE ON public.semester_subjects
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

DROP TRIGGER IF EXISTS set_users_updated_at ON public.users;
CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
