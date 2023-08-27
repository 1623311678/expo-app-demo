import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs,useNavigation } from "expo-router";
import { Alert, Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
  focused?:boolean
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout(props:any) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "主页",
          tabBarLabel: "主页",
          tabBarLabelStyle: { fontSize: 18 },
          tabBarActiveTintColor:'green',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "地图",
          tabBarLabel: "地图",
          tabBarLabelStyle: { fontSize: 18 },
          tabBarActiveTintColor:'green',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="map" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="general"
        options={{
          title: "通用",
          tabBarLabel: "通用",
          tabBarLabelStyle: { fontSize: 18 },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="rocket" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: "相机",
          tabBarLabel: "相机",
          tabBarLabelStyle: { fontSize: 18 },
          tabBarActiveTintColor:'green',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="camera" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: "视频",
          tabBarLabel: "视频",
          tabBarLabelStyle: { fontSize: 18 },
          tabBarBadge:'999+',
          tabBarBadgeStyle:{top:-10},
          tabBarActiveTintColor:'green',
          // tabBarActiveBackgroundColor:'yellow',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="vimeo" color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  );
}
