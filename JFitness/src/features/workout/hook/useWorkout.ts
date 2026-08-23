import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/workout.api";
import { CreateWorkoutInput, Params, WorkoutTutorials, Workout, WorkoutProgress, WorkoutSummary } from "../types/WorkoutTypes";

export const useWorkoutTutorials = (params?: Params) => {
  return useQuery<WorkoutTutorials[]>({
    queryKey: ["workout-tutorials", params],
    queryFn: () => api.getWorkoutTutorial(params),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export const useWorkoutInfo = (workoutId?: number) => {
  return useQuery<WorkoutTutorials>({
    queryKey: ["workout-info", workoutId],
    queryFn: () => api.getWorkoutInfoApi(workoutId!),
    enabled: !!workoutId
  });
};

export const useWorkoutSummary = (
  memberId: number
) => {
  return useQuery<WorkoutSummary>({
    queryKey: ["workout-summary", memberId],
    queryFn: () =>
      api.getWorkoutSummaryApi(memberId)
  });
};

export const useGetPersonalWorkoutHistory = (member_id: number) => {
  return useQuery<Workout[]>({
    queryKey: ["personal-workout-history", member_id],
    queryFn: () => api.getPersonalWorkoutHistoryApi(member_id),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export const useWorkoutProgress = (
  member_id?: number
) => {
  return useQuery<WorkoutProgress[]>({
    queryKey: [
      "workout-progress",
      member_id,
    ],

    queryFn: () =>
      api.getWorkoutProgressApi(
        member_id!
      ),

    enabled: !!member_id
  });
};

export const useSearchExercises = (search: string) => {
  return useQuery<WorkoutTutorials[]>({
    queryKey: ["search-exercises", search],
    queryFn: () => api.searchExerciseApi(search),
    enabled: search.trim().length > 0,
  });
};

export function useAddPersonalWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      member_id,
      data,
    }: {
      member_id: number;
      data: CreateWorkoutInput;
    }) => api.addPersonalWorkoutApi(member_id, data),

    onSuccess: (_, variables) => {
      // Refresh workout list
      queryClient.invalidateQueries({
        queryKey: ["personal-workout-history", variables.member_id],
      });
    }
  });
}