import React from "react";

import { View, ViewStates } from "../components/layout/view";

export const NotFoundView: React.FC = () => (
  <View viewStatus={ViewStates.NotFound} />
);
