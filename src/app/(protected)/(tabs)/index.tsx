import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import cn from "clsx";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top"]} className="bg-white">
        <FlatList
          data={offers}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View className="flex-row flex-between w-full my-5">
              <View className="flex-start">
                <Text className="small-bold text-primary">DELIVER TO</Text>
                <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-bold text-dark-100">Guwahati</Text>
                  <Image
                    source={images.arrowDown}
                    className="size-3"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <CartButton />
              </View>
            </View>
          )}
          renderItem={({ item, index }) => {
            const isEven = index % 2 === 0;

            return (
              <View className="flex-col">
                <Pressable
                  className={cn(
                    "offer-card",
                    isEven ? "flex-row-reverse" : "flex-row"
                  )}
                  style={{ backgroundColor: item.color }}
                  android_ripple={{ color: "#ffffff22" }}
                >
                  {({ pressed }) => (
                    <Fragment>
                      <View className="h-full w-1/2">
                        <Image
                          source={item.image}
                          className="size-full"
                          resizeMode="contain"
                        />
                      </View>

                      <View
                        className={cn(
                          "offer-card__info",
                          isEven ? "pl-10" : "pr-10"
                        )}
                      >
                        <Text className="h1-bold text-white leading-tight">
                          {item.title}
                        </Text>
                        <Image
                          source={images.arrowRight}
                          className="size-10"
                          resizeMode="contain"
                          tintColor={"#ffffff"}
                        />
                      </View>
                    </Fragment>
                  )}
                </Pressable>
              </View>
            );
          }}
          contentContainerClassName="pb-16 px-5"
        />
      </SafeAreaView>
    </>
  );
}
