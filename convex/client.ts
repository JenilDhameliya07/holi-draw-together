
/* eslint-disable */
// This file is used to configure the Convex client for the browser

import { ConvexReactClient } from "convex/react";

export const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL || "https://relaxing-dingo-22.convex.cloud");
