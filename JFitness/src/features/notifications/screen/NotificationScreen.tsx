import {
	View,
	Text,
	Pressable,
	StatusBar,
	FlatList,
	ActivityIndicator,
} from "react-native";
import {
	CreditCard,
	Star,
	Megaphone,
	AlertCircle,
	BellOff,
	Flame,
	User,
	BadgeCheck,
	Bell,
} from "lucide-react-native";

import { NotificationGroup } from "@/features/notifications/components/NotificationGroup";
import { useGetMemberNotifications, useMarkAllNotificationRead } from "../hook/useNotification";
import { useAuth } from "@/context/AuthContext";
import { EmptyState } from "@/components/shared/EmptyState";
import { Loading } from "@/components/shared/Loading";
import { Notification, NotificationGroupType } from "../types/NotifTypes";
import Toast from "react-native-toast-message";


function formatNotificationGroups(notifications: Notification[]) {
	const config: Record<string, any> = {
	  REWARD: {
		 label: "Rewards",
		 icon: Star,
		 color: "#f59e0b",
		 bg: "#fef3c7",
	  },
 
	  PAYMENT: {
		 label: "Payments",
		 icon: CreditCard,
		 color: "#8b5cf6",
		 bg: "#ede9fe",
	  },
 
	  MEMBERSHIP: {
		 label: "Membership",
		 icon: BadgeCheck,
		 color: "#f97316",
		 bg: "#fff7ed",
	  },
 
	  MEMBER: {
		 label: "Members",
		 icon: User,
		 color: "#3b82f6",
		 bg: "#dbeafe",
	  },
 
	  ATTENDANCE: {
		 label: "Attendance",
		 icon: Flame,
		 color: "#ef4444",
		 bg: "#fee2e2",
	  }
	};
 
	const grouped: Record<string, any> = {};
 
	notifications.forEach((notif) => {
	  const type = notif.category;
 
	  if (!grouped[type]) {
		 grouped[type] = {
			...(config[type] ?? {
			  label: "Other",
			  icon: Bell,
			  color: "#64748b",
			  bg: "#f1f5f9",
			}),
			items: [],
		 };
	  }
 
	  grouped[type].items.push({
		 id: notif.id,
		 title: notif.title,
		 body: notif.description,
		 time: notif.created_at,
		 unread: !notif.is_read,
	  });
	});
 
	return Object.values(grouped);
}
 
export default function NotificationsScreen() {
	const { member } = useAuth();

	const { data: notifications = [], isLoading } = useGetMemberNotifications(member?.memberId!);
	const { mutate: markAllRead, isPending } = useMarkAllNotificationRead();

	const groups = formatNotificationGroups(notifications) as NotificationGroupType[];

	const totalUnread = notifications.filter(
		(n:any) => !n.is_read
	).length;

	const handleMarkAllRead = () => {
		markAllRead({ memberId: member?.memberId! }, {
			onSuccess: (data) => {
				Toast.show({
					type: "success",
					text1: "Success",
					text2: data.message,
				});
			}
		})
	};
		
	if (isLoading) return <Loading/>;

	return (
		<>
			<StatusBar barStyle="dark-content" backgroundColor="#fff" />
		
			{/* header */}
			{notifications.length > 0 &&
				<View
					style={{
						paddingVertical: 10,
						paddingHorizontal: 20,
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						backgroundColor: 'white'
					}}
				>
					<View>
						{totalUnread > 0 ? (
							<Text
								style={{
								fontSize: 14,
								color: "#64748b",
								}}
							>
								You have{" "}
								<Text
								style={{
									fontWeight: "700",
									color: "#0f172a",
								}}
								>
								{totalUnread}
								</Text>{" "}
								unread notification{totalUnread > 1 ? "s" : ""}
							</Text>
						) : (
							<Text
								style={{
								fontSize: 14,
								color: "#64748b",
								}}
							>
								All notifications have been reviewed.
							</Text>
						)}
					</View>

					{totalUnread > 0 && 
						<Pressable
							onPress={handleMarkAllRead}
							style={{
								backgroundColor: "#10b981",
								paddingHorizontal: 12,
								paddingVertical: 6,
								borderRadius: 12,
							}}
						>
							{isPending ? (
								<ActivityIndicator/>
							): (
								<Text style={{ fontSize: 12, color: "#fff" }}>
									Mark all read
								</Text>
							)}
							
						</Pressable>
					}
				</View>
			}

			<FlatList
				data={groups}
				keyExtractor={(_, index) => String(index)}
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 20,
				}}
				showsVerticalScrollIndicator={false}

				renderItem={({ item }) => (
					<NotificationGroup
						label={item.label}
						icon={item.icon}
						color={item.color}
						bg={item.bg}
						items={item?.items}
						memberId={member?.memberId!}
					/>
				)}

				ListEmptyComponent={
					<View
						style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						}}
					>
						<EmptyState
						icon={BellOff}
						title="No notifications yet"
						subtitle="You're all caught up. New updates and alerts will appear here."
						/>
					</View>
				}
			/>
		</>
	);
}