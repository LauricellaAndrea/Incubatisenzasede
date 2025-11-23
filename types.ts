import React from 'react';

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  location: Coordinate;
  city: string;
}

export interface StartupLocation {
  id: string;
  location: Coordinate;
}

export interface TooltipData {
  x: number;
  y: number;
  content: string | React.ReactNode;
  visible: boolean;
}