import {
   useQuery,
 } from "@tanstack/react-query";
 
 import * as api from "../api/referral.api";
import { ReferralData, ReferralRecord } from "../types/ReferralTypes";
 
 
 export function useGetMemberReferralData(
   memberId?: number
 ) {
 
   return useQuery<ReferralData>({
 
     queryKey:[
       "member-referral-data",
       memberId,
     ],
 
     queryFn:()=> 
      api.getMemberReferralDataApi(
         memberId!
       ),
 
     enabled:
       !!memberId,
 
     staleTime:
       5 * 60 * 1000,
 
   });
 
 }
 
 export function useGetMemberReferralRecords(
   memberId?: number
 ) {
 
   return useQuery<ReferralRecord[]>({
 
     queryKey:[
       "member-referral-records",
       memberId,
     ],
 
     queryFn:()=> 
      api.getMemberReferralRecordsApi(
         memberId!
       ),
 
     enabled:
       !!memberId,
 
     staleTime:
       5 * 60 * 1000,
 
   });
 
 }