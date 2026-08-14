import { View, Text } from "react-native";
import {
  Flame,
  Receipt,
  Trophy,
  Activity,
  Dumbbell,
  Tag,
  User,
  CreditCard,
} from "lucide-react-native";
import { EmptyState } from "@/components/shared/EmptyState";

function formatActivityDate(date: string | Date) {
	const activityDate = new Date(date);

	return activityDate.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
}

function getActivityIcon(type: string) {
	switch (type) {
	  case "ATTENDANCE":
		 return Flame;
 
	  case "PAYMENT":
		 return Receipt;
 
	  case "MEMBERSHIP":
		 return CreditCard;
 
	  case "REWARD":
		 return Trophy;
 
	  case "MEMBER":
		 return User;
 
	  case "PRICING":
		 return Tag;
 
	  case "WORKOUT":
		 return Dumbbell;
 
	  default:
		 return Activity;
	}
 }

function getActivityColor(type: string) {
	switch(type) {
		case "CHECK_IN":
			return {
				bg: "#d1fae5",
				color: "#10b981",
			};
		case "PAYMENT":
			return {
				bg: "#dbeafe",
				color: "#2563eb",
			};
		case "REWARD_CLAIM":
			return {
				bg: "#fef3c7",
				color: "#d97706",
			};
		default:
			return {
				bg: "#e2e8f0",
				color: "#64748b",
			};
	}
}

export function ActivityList({ activities }: any) {
	return (
		<View style={{ paddingHorizontal: 20 }}>
			<Text
				style={{
					fontSize: 16,
					fontWeight: "700",
					marginVertical: 10,
					color: "#0f172a",
				}}
			>
				Recent Activity
			</Text>

			{activities.length === 0 ? (
				<EmptyState
					icon={Activity}
					title="No activity yet"
					subtitle="Your check-ins, workouts, payments, and rewards will appear here."
				/>
			) : (
				activities.map((a: any, i: number) => {
					const Icon = getActivityIcon(a.type);
					const iconStyle = getActivityColor(a.type);

					return (
						<View
							key={i}
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 14,
								backgroundColor: "white",
								borderRadius: 14,
								marginBottom: 10,

								shadowColor: "#000",
								shadowOpacity: 0.06,
								shadowRadius: 8,
								shadowOffset: {
								width: 0,
								height: 3,
								},

								elevation: 3,
							}}
						>
							<View
								style={{
									width: 40,
									height: 40,
									borderRadius: 12,
									backgroundColor: iconStyle.bg,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Icon size={18} color={iconStyle.color}/>
							</View>

							<View
								style={{
									flex: 1,
									marginLeft: 10,
								}}
							>
								<Text
									style={{
										fontWeight: "600",
										fontSize: 14,
										color: "#0f172a",
									}}
								>
									{a.name}
								</Text>

								<Text
									style={{
										fontSize: 12,
										color: "#64748b",
										marginTop: 3,
									}}
								>
									{a.action}
								</Text>

								<Text
									style={{
										fontSize: 11,
										color: "#94a3b8",
										marginTop: 5,
									}}
								>
									{formatActivityDate(a.time)}
								</Text>
							</View>
						</View>
					);
				})
			)}
		</View>
	);
}