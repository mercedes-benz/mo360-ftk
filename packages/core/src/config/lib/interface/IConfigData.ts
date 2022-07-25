// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import IConfigCoreData from './IConfigCoreData';

interface IConfigData<TProject = object, TRuntime = object> {
    core: IConfigCoreData;
    project: TProject;
    runtime: TRuntime;
}

export default IConfigData;
