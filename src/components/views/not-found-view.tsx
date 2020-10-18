import React from "react";

import View, { ViewStates } from "../layout/view";

const NotFoundView: React.FC = () => <View viewStatus={ViewStates.NotFound} />;

export default NotFoundView;
