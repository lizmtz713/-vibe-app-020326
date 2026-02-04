import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Auth Screens
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { SignUpScreen } from './src/screens/auth/SignUpScreen';
import { JoinFamilyScreen } from './src/screens/auth/JoinFamilyScreen';

// Teen Screens
import { CheckInScreen } from './src/screens/teen/CheckInScreen';
import { JournalScreen } from './src/screens/teen/JournalScreen';
import { ResourcesScreen } from './src/screens/teen/ResourcesScreen';
import { InsightsScreen } from './src/screens/teen/InsightsScreen';
import { BreathingScreen } from './src/screens/teen/BreathingScreen';
import { SafetyPlanScreen } from './src/screens/teen/SafetyPlanScreen';
import { SkillsScreen } from './src/screens/teen/SkillsScreen';

// Parent Screens
import { DashboardScreen } from './src/screens/parent/DashboardScreen';
import { GuidanceScreen } from './src/screens/parent/GuidanceScreen';
import { SettingsScreen } from './src/screens/parent/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TeenTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 12,
          shadowOpacity: 0.1,
          height: 88,
          paddingTop: 8,
          paddingBottom: 24,
        },
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          
          if (route.name === 'CheckIn') iconName = focused ? 'happy' : 'happy-outline';
          else if (route.name === 'Insights') iconName = focused ? 'bulb' : 'bulb-outline';
          else if (route.name === 'Journal') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Resources') iconName = focused ? 'heart' : 'heart-outline';
          
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="CheckIn" 
        component={CheckInScreen} 
        options={{ tabBarLabel: 'vibe check' }}
      />
      <Tab.Screen 
        name="Insights" 
        component={InsightsScreen} 
        options={{ tabBarLabel: 'patterns' }}
      />
      <Tab.Screen 
        name="Journal" 
        component={JournalScreen} 
        options={{ tabBarLabel: 'journal' }}
      />
      <Tab.Screen 
        name="Resources" 
        component={ResourcesScreen} 
        options={{ tabBarLabel: 'help' }}
      />
    </Tab.Navigator>
  );
}

function ParentTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 12,
          shadowOpacity: 0.1,
          height: 88,
          paddingTop: 8,
          paddingBottom: 24,
        },
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          
          if (route.name === 'Dashboard') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Guidance') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ tabBarLabel: 'Overview' }}
      />
      <Tab.Screen 
        name="Guidance" 
        component={GuidanceScreen} 
        options={{ tabBarLabel: 'Parent Guide' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="JoinFamily" component={JoinFamilyScreen} />
    </Stack.Navigator>
  );
}

function TeenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TeenTabs" component={TeenTabs} />
      <Stack.Screen 
        name="Breathing" 
        component={BreathingScreen}
        options={{ presentation: 'fullScreenModal' }}
      />
      <Stack.Screen 
        name="SafetyPlan" 
        component={SafetyPlanScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="Skills" 
        component={SkillsScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name="JoinFamily" component={JoinFamilyScreen} />
    </Stack.Navigator>
  );
}

function ParentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ParentTabs" component={ParentTabs} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingLogo}>VIBE</Text>
        <Text style={styles.loadingTagline}>💜</Text>
        <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 20 }} />
      </View>
    );
  }

  if (!user) {
    return <AuthStack />;
  }

  return user.role === 'teen' ? <TeenStack /> : <ParentStack />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6366F1',
  },
  loadingLogo: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 8,
  },
  loadingTagline: {
    fontSize: 32,
    marginTop: 8,
  },
});
