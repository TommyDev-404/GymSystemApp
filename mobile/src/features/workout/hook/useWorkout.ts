import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/workout.api";
import { CreateWorkoutInput, Params, Workout } from "../types/WorkoutTypes";

export const useWorkoutTutorials = (params?: Params) => {
  return useQuery<Workout[]>({
    queryKey: ["workout-tutorials", params],
    queryFn: () => api.getWorkoutTutorial(params),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export const useGetPersonalWorkoutHistory = (member_id: number) => {
  return useQuery<Workout[]>({
    queryKey: ["personal-workout-history", member_id],
    queryFn: () => api.getPersonalWorkoutHistoryApi(member_id),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
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