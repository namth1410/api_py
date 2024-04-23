import { SearchBar } from "@rneui/themed";
import axios from "axios";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import YoutubeItem from "./components/YoutubeItem";
import Ionicons from "@expo/vector-icons/Ionicons";

export const screenHeight = Dimensions.get("window").height;
export const screenWidth = Dimensions.get("window").width;

export default function App() {
  const [search, setSearch] = useState("");
  const [res, setRes] = useState(null);
  const searchInputRef = useRef(null);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const onSearch = async () => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
    if (search === "") return;
    const options = {
      method: "GET",
      url: "https://yt-api.p.rapidapi.com/search",
      params: { query: search, type: "video" },
      headers: {
        "X-RapidAPI-Key": "abd72d5a47msh3f27cd7a9913130p1f4d7ajsn5362cf819125",
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setRes(response.data.data.filter((el) => el.type === "video"));
    } catch (error) {
      console.error(error);
    }
  };

  const onAction = async (action) => {
    try {
      const response = await axios.post(`http://192.168.1.20:5000/${action}`, {
        as: "asd",
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      console.error(error.toJSON());
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <View
          style={{
            width: screenWidth,
            flexDirection: "row",
          }}
        >
          <SearchBar
            placeholder="Tìm kiếm..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={{
              border: "none",
              flex: 1,
              zIndex: 0,
            }}
            ref={searchInputRef}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              backgroundColor: "#86d2ff",
              borderRadius: 4,
              paddingHorizontal: 8,
            }}
            onPress={onSearch}
          >
            <Text
              style={{
                color: "#F1F1D4",
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: screenWidth,
            borderWidth: 1,
            borderBottomColor: "gray",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              borderRightWidth: 1,
              borderRightColor: "gray",
            }}
            onPress={() => {
              onAction("volumn_down");
            }}
          >
            <Ionicons name="volume-low" size={32} color="pink" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              borderRightWidth: 1,
              borderRightColor: "gray",
            }}
            onPress={() => {
              onAction("volumn_up");
            }}
          >
            <Ionicons name="volume-high" size={32} color="pink" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              borderRightWidth: 1,
              borderRightColor: "gray",
            }}
            onPress={() => {
              onAction("play_or_pause");
            }}
          >
            <Ionicons name="play" size={32} color="pink" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              borderRightWidth: 1,
              borderRightColor: "gray",
            }}
            onPress={() => {
              onAction("next_track");
            }}
          >
            <Ionicons name="arrow-forward" size={32} color="pink" />
          </TouchableOpacity>
        </View>
        {res && (
          <FlatList
            data={res}
            renderItem={({ item }) => <YoutubeItem item={item} />}
            keyExtractor={(item) => item.videoId}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303337",
    alignItems: "center",
    width: screenWidth,
  },
});
