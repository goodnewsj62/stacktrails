"use client";

import Loading from "@/app/[locale]/(public)/loading";
import { ReactNode } from "react";
import CenterOnLgScreen from "./CenterOnLgScreen";
import Empty from "./Empty";
import ErrorDisplay from "./Error";

type LoadingComponentProps<T> = {
  loading: boolean;
  empty?: boolean;
  error?: boolean;
  data?: T;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  errorComponent?: ReactNode;
  children?: ((data: T) => ReactNode) | ReactNode;
};

const LoadingComponent = <T,>({
  loading,
  empty = false,
  error = false,
  data,
  loadingComponent,
  emptyComponent,
  errorComponent,
  children,
}: LoadingComponentProps<T>) => {
  if (error) {
    return (
      errorComponent ?? (
        <CenterOnLgScreen>
          <ErrorDisplay />
        </CenterOnLgScreen>
      )
    );
  }

  if (loading) {
    return (
      loadingComponent ?? (
        <CenterOnLgScreen>
          <Loading />
        </CenterOnLgScreen>
      )
    );
  }

  if (empty) {
    return (
      emptyComponent ?? (
        <CenterOnLgScreen>
          <Empty />
        </CenterOnLgScreen>
      )
    );
  }

  if (typeof children === "function") {
    // safe cast: children will only be called if data is defined
    return <>{data !== undefined ? children(data) : null}</>;
  }

  return <>{children}</>;
};

export default LoadingComponent;
