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

import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ArrowLeft,
  Play,
  Dumbbell,
  Target,
  ImageOff,
} from "lucide-react-native";


const { width } = Dimensions.get("window");


function parseArray(value: any): string[] {
  try {
    let result = value;

    while (typeof result === "string") {
      result = JSON.parse(result);
    }

    if (!Array.isArray(result)) {
      return [];
    }

    return result.flatMap((item) =>
      typeof item === "string" && item.startsWith("[")
        ? parseArray(item)
        : item
    );

  } catch {
    return [];
  }
}

function getYoutubeVideoId(url: string) {
  try {
    const urlObj = new URL(url);

    if (
      urlObj.hostname.includes("youtube.com")
    ) {
      return urlObj.searchParams.get("v");
    }


    if (
      urlObj.hostname.includes("youtu.be")
    ) {
      return urlObj.pathname.slice(1);
    }


    return null;

  } catch {
    return null;
  }
}



export default function WorkoutTutorialDetails() {

  const { workout } = useLocalSearchParams();


  const [activeImage, setActiveImage] =
    useState(0);


  const [failedImages, setFailedImages] =
    useState<number[]>([]);



  const data = workout
    ? JSON.parse(workout as string)
    : null;



  if (!data) {
    return (
      <SafeAreaView
        style={{
          flex:1,
          justifyContent:"center",
          alignItems:"center",
        }}
      >
        <Text>
          No workout found
        </Text>
      </SafeAreaView>
    );
  }



  const muscles =
    parseArray(
      data.muscles_targeted
    );


  const equipment =
    parseArray(
      data.equipment
    );


  const images =
    parseArray(
      data.demo_images
    );



  const videoId =
    getYoutubeVideoId(
      data.video_url
    );



  const thumbnail =
    videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : null;



  const gallery =
    images.length > 0
      ? images
      : thumbnail
        ? [thumbnail]
        : [];



  return (
    <SafeAreaView
      style={{
        flex:1,
        backgroundColor:"white",
      }}
    >


      {/* BACK BUTTON */}
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
            backgroundColor:
              "rgba(0,0,0,0.5)",

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

            showsHorizontalScrollIndicator={
              false
            }


            onMomentumScrollEnd={(event)=>{

              const index =
                Math.round(
                  event.nativeEvent.contentOffset.x /
                  width
                );


              setActiveImage(index);

            }}


            keyExtractor={(_,index)=>
              index.toString()
            }



            renderItem={({item,index})=>{


              const hasError =
                failedImages.includes(index);



              if(hasError){

                return (
                  <View
                    style={{
                      width,
                      height:320,
                      backgroundColor:"#e2e8f0",
                      justifyContent:"center",
                      alignItems:"center",
                    }}
                  >

                    <ImageOff
                      size={45}
                      color="#94a3b8"
                    />

                    <Text
                      style={{
                        marginTop:10,
                        color:"#64748b",
                      }}
                    >
                      Image unavailable
                    </Text>

                  </View>
                );

              }



              return (

                <Image

                  source={{
                    uri:item,
                  }}


                  onError={()=>{
                    setFailedImages(prev =>
                      prev.includes(index)
                        ? prev
                        : [
                            ...prev,
                            index,
                          ]
                    );
                  }}


                  style={{
                    width,
                    height:320,
                  }}


                  resizeMode="cover"

                />

              );

            }}

          />



          {/* DOT INDICATOR */}
          {
            gallery.length > 1 && (

              <View
                style={{
                  position:"absolute",
                  bottom:35,
                  left:0,
                  right:0,

                  flexDirection:"row",
                  justifyContent:"center",
                  alignItems:"center",

                  gap:6,
                }}
              >

                {
                  gallery.map((_,index)=>(

                    <View
                      key={index}
                      style={{

                        width:
                          activeImage === index
                            ? 22
                            : 7,


                        height:7,


                        borderRadius:10,


                        backgroundColor:
                          activeImage === index
                            ? "#10b981"
                            : "#cbd5e1",

                      }}
                    />

                  ))
                }

              </View>

            )
          }


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
              gap:12,
            }}
          >


            <View
              style={{
                flexDirection:"row",
                alignItems:"center",
                gap:8,
              }}
            >

              <Dumbbell
                size={18}
                color="#64748b"
              />

              <Text
                style={{
                  color:"#64748b",
                }}
              >

                Equipment:
                {" "}
                {equipment.join(", ")}

              </Text>

            </View>





            <View
              style={{
                flexDirection:"row",
                alignItems:"center",
                gap:8,
              }}
            >

              <Target
                size={18}
                color="#64748b"
              />

              <Text
                style={{
                  color:"#64748b",
                }}
              >

                Muscles:
                {" "}
                {muscles.join(", ")}

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





      {/* YOUTUBE BUTTON */}
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

          onPress={() =>
            Linking.openURL(
              data.video_url
            )
          }


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


          <Play
            size={18}
            color="white"
          />


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