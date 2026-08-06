import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";

import {
  X,
  Heart,
  ImageOff,
  MessageCircle,
} from "lucide-react-native";
import { useToggleLike } from "../hooks/useCommunity";
import { useAuth } from "@/context/AuthContext";


const GREEN = "#10b981";
const { width, height } = Dimensions.get("window");

export function PostCard({ post, onCommentPress }: any) {
	const { member } = useAuth();
	const { mutate: toggleLikeApi } = useToggleLike();
 
	const imageViewerRef = useRef<ScrollView>(null);

	const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [liked, setLiked] = useState(post.liked);
	const [likeCount, setLikeCount] = useState(post.like);

	const toggleLike = () => {
		const newLiked = !liked;
		setLiked(newLiked);
	 
		setLikeCount((prev: any) =>
		  newLiked ? prev + 1 : prev - 1
		);
	 
		toggleLikeApi(
		  {
			 post_id: post.id,
			 member_id: member!.memberId,
		  },
			{
			  onSuccess: () => {
				console.log("Like toggled successfully");
				},
				
			 onError: () => {
				// rollback
				setLiked(!newLiked);
	 
				setLikeCount((prev: any) =>
				  newLiked ? prev - 1 : prev + 1
				);
			 },
		  }
		);
	};

	const openImage = (index:number) => {
		setSelectedImage(index);

		setTimeout(()=>{
			imageViewerRef.current?.scrollTo({
				x:index * width,
				animated:false
			});
		},100);
	};

	return (
		<View
			style={{
			backgroundColor:"#fff",
			borderRadius:16,
			marginHorizontal:16,
			marginBottom:14,
			overflow:"hidden",

			shadowColor:"#0f172a",
			shadowOpacity:0.06,
			shadowRadius:10,
			shadowOffset:{
			width:0,
			height:4
			},

			elevation:3,
			}}
		>
			{/* HEADER */}
			<View
			style={{
			flexDirection:"row",
			alignItems:"center",
			padding:14,
			gap:10
			}}
			>


			<View
			style={{
			width:40,
			height:40,
			borderRadius:20,
			backgroundColor:"#ecfdf5",
			alignItems:"center",
			justifyContent:"center"
			}}
			>

			<Text
			style={{
			color:GREEN,
			fontWeight:"700"
			}}
			>
			{
			post.author
			?.split(" ")
			.map((n:string)=>n[0])
			.join("")
			}

			</Text>

			</View>



			<View>

			<Text
			style={{
			fontWeight:"700",
			color:"#0f172a"
			}}
			>
			{post.author}
			</Text>


			<Text
			style={{
			fontSize:12,
			color:"#94a3b8"
			}}
			>
			{
			new Date(post.date)
			.toLocaleDateString(
			"en-US",
			{
			month:"short",
			day:"numeric",
			year:"numeric"
			}
			)
			}

			</Text>


			</View>


			</View>

			{/* CONTENT */}
			<View
			style={{
			paddingHorizontal:14,
			paddingBottom:12
			}}
			>

			<Text
			style={{
			fontSize:14,
			color:"#1e293b",
			lineHeight:20
			}}
			>
			{post.content}
			</Text>

			</View>

			{/* IMAGES */}
			{post.images?.length > 0 ?
				<ScrollView
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
				>
					{post.images.map((image:string, index:number) => (
						<Pressable
							key={index}
							onPress={()=>openImage(index)}
						>
							<Image
								source={{ uri:image }}
								style={{
									width:width - 32,
									height:260,
									backgroundColor:"#f1f5f9"
								}}
								resizeMode="cover"
							/>
						</Pressable>
					))}
				</ScrollView>
			:
				<View
					style={{
						height:120,
						backgroundColor:"#f8fafc",
						justifyContent:"center",
						alignItems:"center"
					}}
				>
					<ImageOff size={22} color="#cbd5e1"/>

					<Text
						style={{
							fontSize:12,
							color:"#94a3b8",
							marginTop:5
						}}
					>
						No images
					</Text>
				</View>
			}

			{/* COUNTS */}
			{(likeCount > 0 || post.comment > 0) && (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 14,
					paddingVertical: 10,
				}}
			>

				{likeCount > 0 && (
					<Text
					style={{
						fontSize: 12,
						color: "#94a3b8",
					}}
					>
					❤️ {likeCount} {likeCount === 1 ? "like" : "likes"}
					</Text>
				)}


				{post.comment > 0 && (
					<Text
					style={{
						fontSize: 12,
						color: "#94a3b8",
						marginLeft: "auto",
					}}
					>
					💬 {post.comment} {post.comment === 1 ? "comment" : "comments"}
					</Text>
				)}

			</View>
			)}

			{/* ACTIONS */}
			<View
			style={{
				flexDirection: "row",
				borderTopWidth: 1,
				borderTopColor: "#f1f5f9",
			}}
			>


			<ActionButton
				icon={Heart}
				label="Like"
				active={liked}
				onPress={toggleLike}
			/>


			<ActionButton
				icon={MessageCircle}
				label="Comment"
				onPress={onCommentPress}
			/>


			</View>

			{/* IMAGE VIEWER */}
			<Modal
			visible={selectedImage !== null}
			transparent
			animationType="fade"
			onRequestClose={()=>setSelectedImage(null)}
			>


			<View
			style={{
			flex:1,
			backgroundColor:"rgba(0,0,0,0.95)"
			}}
			>


			<Pressable
			onPress={()=>setSelectedImage(null)}
			style={{
			position:"absolute",
			top:50,
			right:20,
			zIndex:20,

			width:40,
			height:40,
			borderRadius:20,

			backgroundColor:"rgba(255,255,255,0.2)",

			justifyContent:"center",
			alignItems:"center"
			}}
			>

			<X
			size={24}
			color="white"
			/>

			</Pressable>




			<ScrollView
			ref={imageViewerRef}
			horizontal
			pagingEnabled
			showsHorizontalScrollIndicator={false}
			>

			{
			post.images?.map(
			(image:string,index:number)=>(

			<View
			key={index}
			style={{
			width,
			height,
			justifyContent:"center",
			alignItems:"center"
			}}
			>


			<Image
			source={{
			uri:image
			}}
			style={{
			width,
			height:height * 0.8
			}}
			resizeMode="contain"
			/>


			</View>

			))
			}


			</ScrollView>



			</View>


			</Modal>

		</View>
	);
}


function ActionButton({
	icon:Icon,
	label,
	active,
	onPress
}:any){

	return (

	<Pressable
	onPress={onPress}
	style={{
	flex:1,
	flexDirection:"row",
	justifyContent:"center",
	alignItems:"center",
	gap:6,
	paddingVertical:12
	}}
	>


	<Icon
	size={18}
	color={
	active
	? GREEN
	:"#64748b"
	}

	fill={
	active
	? GREEN
	:"none"
	}

	/>


	<Text
	style={{
	fontSize:13,
	fontWeight:"600",
	color:
	active
	? GREEN
	:"#64748b"
	}}
	>
	{label}
	</Text>


	</Pressable>

	);
}