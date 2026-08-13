import { View, Text, Pressable } from "react-native";
import {
  ArrowLeft,
  FileText,
  Heart,
  MessageCircle,
} from "lucide-react-native";

interface Props {
  onBack?: () => void;
  stats: {
    totalPosts: number;
    totalLikes: number;
    totalComments: number;
  };
}

export function YourPostsHeader({ onBack, stats }: Props) {
	return (
		<View
			style={{
				backgroundColor: "white",
				paddingHorizontal: 16,
				paddingVertical: 10,
				borderBottomWidth: 1,
				borderBottomColor: "#f1f5f9",
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Pressable
					onPress={onBack}
					style={{
						width:32,
						height:32,
						borderRadius:8,
						backgroundColor:"#f8fafc",
						alignItems:"center",
						justifyContent:"center",
					}}
				>
					<ArrowLeft size={17} color="#334155"/>
				</Pressable>

				<Text
					style={{
						marginLeft:10,
						fontSize:17,
						fontWeight:"700",
						color:"#0f172a",
					}}
				>
					Your Posts
				</Text>
			</View>

			{/* MINI STATS */}
			<View
				style={{
					flexDirection:"row",
					marginTop:10,
					alignItems:"center",
				}}
			>
				<MiniStat
					icon={FileText}
					value={stats.totalPosts}
					label="Posts"
				/>

				<Divider />

				<MiniStat
					icon={Heart}
					value={stats.totalLikes}
					label="Likes"
				/>

				<Divider />

				<MiniStat
					icon={MessageCircle}
					value={stats.totalComments}
					label="Comments"
				/>
			</View>
		</View>
	);
}


function MiniStat({
  icon: Icon,
  value,
  label,
}:{
  icon:any;
  value:number;
  label:string;
}) {

  return (
    <View
      style={{
        flexDirection:"row",
        alignItems:"center",
        flex:1,
        justifyContent:"center",
      }}
    >

      <Icon
        size={13}
        color="#10b981"
      />

      <Text
        style={{
          marginLeft:4,
          fontSize:12,
          fontWeight:"700",
          color:"#0f172a",
        }}
      >
        {value}
      </Text>

      <Text
        style={{
          marginLeft:3,
          fontSize:11,
          color:"#64748b",
        }}
      >
        {label}
      </Text>

    </View>
  );
}

function Divider(){
  return (
    <View
      style={{
        height:18,
        width:1,
        backgroundColor:"#e2e8f0",
      }}
    />
  );
}