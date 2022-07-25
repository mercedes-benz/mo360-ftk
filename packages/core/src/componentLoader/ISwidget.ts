// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import * as React from 'react';

export interface ISwidget<TProps = object> extends React.FunctionComponent<TProps> {
  metadata: ISwidgetMetadata;
}

export interface ISwidgetMetadata {
  /**
   * A list of authors for the swidget.
   *
   * @example [ 'John Doe <john.doe@example.com' ]
   */
  authors?: string[];

  /**
   * Descriptive name of the organization that built the swidget.
   *
   * @example ACME Corp.
   */
  organization?: string;

  /**
   * Business unit within an organization that built the swidget.
   *
   * @example 'R&D Department'
   */
  businessUnit?: string;

  /**
   * @example 'A swidget to display recent Stock data'
   */
  description?: string;

  /**
   * A semver format that indicates to which ftk core versions this swidget is compatible.
   *
   * @example '2.0.x' would require the host app to base on ftk-core >= 2.0.x
   */
  ftkCompatibleVersion?: string;

  /**
   * Swidgets own version. Must use Semantic versioning (semver).
   */
  version?: string;
}
