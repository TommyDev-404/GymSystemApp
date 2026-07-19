import {
  View,
  Text,
  Pressable,
  Linking,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Play,
  Dumbbell,
  Target,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

function parseArray(value: any) {
  try {
    if (Array.isArray(value)) return value;
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function getYoutubeVideoId(url: string) {
  try {
    const urlObj = new URL(url);

    if (urlObj.hostname.includes("youtube.com")) {
      return urlObj.searchParams.get("v");
    }

    if (urlObj.hostname.includes("youtu.be")) {
      return urlObj.pathname.slice(1);
    }

    return null;
  } catch {
    return null;
  }
}

export default function WorkoutTutorialDetails() {
  const { workout } = useLocalSearchParams();

  console.log(workout);
  const data = workout
    ? JSON.parse(workout as string)
    : null;

  if (!data) {
    return (
      <SafeAreaView>
        <Text>No workout found</Text>
      </SafeAreaView>
    );
  }

  const muscles = parseArray(data.muscles_targeted);
  const equipment = parseArray(data.equipment);
  const images = parseArray(data.demo_images);

  const videoId = getYoutubeVideoId(data.video_url);

  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  const gallery =
    images.length > 0
      ? images
      : thumbnail
        ? [thumbnail]
        : [];

  const videoUrl = data.video_url;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* HEADER */}
      <View
        style={{
          position:"absolute",
          top:50,
          left:16,
          zIndex:10,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            backgroundColor:"rgba(0,0,0,0.5)",
            padding:10,
            borderRadius:999,
          }}
        >
          <ArrowLeft
            size={20}
            color="white"
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom:100,
        }}
      >
        {/* IMAGE CAROUSEL */}
        <View
          style={{
            height:320,
          }}
        >
          <FlatList
            data={gallery}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_,i)=>i.toString()}
            renderItem={({item})=>(
              <Image
                source={{
                  uri:item,
                }}
                style={{
                  width,
                  height:320,
                }}
                resizeMode="cover"
              />
            )}
          />
        </View>

        {/* CONTENT */}
        <View
          style={{
            padding:20,
            marginTop:-20,
            backgroundColor:"white",
            borderTopLeftRadius:25,
            borderTopRightRadius:25,
          }}
        >


          {/* TITLE */}
          <Text
            style={{
              fontSize:24,
              fontWeight:"800",
              color:"#0f172a",
            }}
          >
            {data.name}
          </Text>



          {/* CATEGORY */}
          <Text
            style={{
              marginTop:6,
              color:"#10b981",
              fontWeight:"700",
            }}
          >
            {data.category}
            {" • "}
            {data.level}
          </Text>



          {/* INFO */}
          <View
            style={{
              marginTop:18,
              gap:10,
            }}
          >

            <View
              style={{
                flexDirection:"row",
                alignItems:"center",
                gap:8,
              }}
            >
              <Dumbbell size={18} color="#64748b"/>

              <Text
                style={{
                  color:"#64748b",
                }}
              >
                Equipment: {equipment.join(", ")}
              </Text>

            </View>



            <View
              style={{
                flexDirection:"row",
                alignItems:"center",
                gap:8,
              }}
            >

              <Target size={18} color="#64748b"/>

              <Text
                style={{
                  color:"#64748b",
                }}
              >
                Muscles: {muscles.join(", ")}
              </Text>

            </View>


          </View>




          {/* INSTRUCTIONS */}
          <View
            style={{
              marginTop:25,
            }}
          >

            <Text
              style={{
                fontSize:17,
                fontWeight:"700",
              }}
            >
              Instructions
            </Text>


            <Text
              style={{
                marginTop:10,
                color:"#64748b",
                lineHeight:22,
              }}
            >
              {data.instructions}
            </Text>

          </View>


        </View>


      </ScrollView>

      {/* BUTTON */}
      <View
        style={{
          position:"absolute",
          bottom:0,
          left:0,
          right:0,
          padding:16,
          backgroundColor:"white",
          borderTopWidth:1,
          borderColor:"#e2e8f0",
        }}
      >

        <Pressable
          onPress={() => Linking.openURL(videoUrl)}
          style={{
            backgroundColor:"#10b981",
            paddingVertical:14,
            borderRadius:14,
            alignItems:"center",
            flexDirection:"row",
            justifyContent:"center",
            gap:8,
          }}
        >

          <Play size={18} color="white"/>

          <Text
            style={{
              color:"white",
              fontWeight:"700",
            }}
          >
            Watch on YouTube
          </Text>

        </Pressable>

      </View>


    </SafeAreaView>
  );
}