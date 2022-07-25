// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { SwidgetLoader } from '@daimler/ftk-core';
import * as React from 'react';

class FallbackComponentTest extends React.Component<{}> {
  public render() {
    return (
      <>
        <div className="fallback">
          <FallbackTest />
        </div>
        <div className="default-fallback">
          <DefaultFallbackTest />
        </div>
      </>
    );
  }
}

function FallbackTest() {
  const fallback = (error: Error) => {
    return <h1 className="fallback">{error.message.toString()}</h1>;
  };
  return <SwidgetLoader errorFallback={fallback} url="garbage" name={'garbage'} />;
}

function DefaultFallbackTest() {
  return <SwidgetLoader url="garbage" name={'garbage'} />;
}

export default FallbackComponentTest;
