import React from "react";

import { View, ViewStates } from "../../layout/view";

export const NotFoundView: React.FC = () => (
  <View viewStatus={ViewStates.NotFound} />
);
