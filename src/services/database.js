import { supabase } from './supabase';

// Semesters
export const getSemesters = async (userId) => {
  const { data, error } = await supabase
    .from('semester_results')
    .select(`
      *,
      semester_subjects (*)
    `)
    .eq('user_id', userId)
    .order('semester_no', { ascending: true });
  
  return { data, error };
};

export const getSemester = async (userId, semesterNo) => {
  const { data, error } = await supabase
    .from('semester_results')
    .select(`
      *,
      semester_subjects (*)
    `)
    .eq('user_id', userId)
    .eq('semester_no', semesterNo)
    .single();

  return { data, error };
};

export const saveSemester = async (userId, semesterNo, subjects) => {
  // 1. Upsert semester_result (this guarantees it exists and we get the id)
  const { data: semesterData, error: semesterError } = await supabase
    .from('semester_results')
    .upsert({
      user_id: userId,
      semester_no: semesterNo
    }, { onConflict: 'user_id, semester_no' })
    .select()
    .single();

  if (semesterError) return { error: semesterError };

  const semesterId = semesterData.id;

  // 2. We need to handle subjects. 
  // An easy sync strategy for auto-save: delete existing subjects and re-insert.
  // The trigger on semester_subjects will auto-recalculate the totals for semester_results.
  const { error: deleteError } = await supabase
    .from('semester_subjects')
    .delete()
    .eq('semester_result_id', semesterId);
  
  if (deleteError) return { error: deleteError };

  // Only insert if there are subjects
  if (subjects && subjects.length > 0) {
    const subjectsToInsert = subjects.map(sub => ({
      semester_result_id: semesterId,
      subject_name: sub.subject_name,
      credit: Number(sub.credit),
      grade_point: Number(sub.grade_point)
    }));

    const { error: insertError } = await supabase
      .from('semester_subjects')
      .insert(subjectsToInsert);

    if (insertError) return { error: insertError };
  }

  // 3. Re-fetch to get updated totals after triggers fire
  const { data: finalData, error: finalError } = await supabase
    .from('semester_results')
    .select(`
      *,
      semester_subjects (*)
    `)
    .eq('id', semesterId)
    .single();

  return { data: finalData, error: finalError };
};

export const deleteSemester = async (semesterId) => {
  const { data, error } = await supabase
    .from('semester_results')
    .delete()
    .eq('id', semesterId);
  
  return { data, error };
};

export const saveSemesterGpa = async (userId, semesterNo, gpa) => {
  const { data, error } = await supabase
    .from('semester_results')
    .upsert({
      user_id: userId,
      semester_no: semesterNo,
      semester_gpa: gpa === '' || gpa === null ? null : parseFloat(gpa)
    }, { onConflict: 'user_id, semester_no' })
    .select()
    .single();

  return { data, error };
};
