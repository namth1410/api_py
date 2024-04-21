import { Button, Icon, Image, Overlay } from "@rneui/themed";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

function YoutubeItem({ item }) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View
      style={{
        width: screenWidth,
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <TouchableOpacity
        style={{
          width: 360,
          height: 202,
          borderRadius: 8,
          overflow: "hidden",
        }}
        onPress={toggleOverlay}
      >
        <Image
          source={{ uri: item.thumbnail[0].url }}
          containerStyle={{
            aspectRatio: 1,
            width: "100%",
            flex: 1,
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </TouchableOpacity>
      <Text style={{ ...styles.text, ...styles.title }}>{item.title}</Text>
      <Text style={styles.text}>{`${item.viewCount} lượt xem`}</Text>
      <Text style={styles.text}>{item.publishedTimeText}</Text>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Button
          icon={
            <Icon
              name="wrench"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          title="Mở"
          onPress={toggleOverlay}
        />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    alignSelf: "flex-start",
    paddingLeft: 25,
    color: "#A5A5A5",
    fontSize: 12,
  },

  title: {
    fontWeight: "bold",
    color: "#F1F1D4",
    fontSize: 16,
    marginVertical: 5,
  },
});

export default YoutubeItem;
