// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { createStyles, Theme, withStyles, WithStyles, Container, Typography, Box, Button } from '@material-ui/core';
import { I18nService, inject, withInject, RouterService, ConfigService } from '@daimler/ftk-core';
import * as React from 'react';

import Logo from '../components/Logo';
import ProjectConfig from '../globals/interfaces/ProjectConfig';

const HomeStyles = ({ spacing, palette }: Theme) =>
  createStyles({
    congratulation: {
      color: palette.primary.light,
      margin: spacing(1),
      textAlign: 'center',
    },
    centered: {
      textAlign: 'center',
    },
  });

class Home extends React.Component<WithStyles<typeof HomeStyles>, {}> {
  @inject()
  public i18n!: I18nService;

  @inject()
  public router!: RouterService;

  @inject()
  public config!: ConfigService;

  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Container>
        <Logo />
        <Typography variant={'h5'} gutterBottom={true} align="center">
          {this.i18n.translateToString('Headline', {
            appName: this.config.getConfig<ProjectConfig, {}>().project.appName,
          })}
        </Typography>

        <Typography variant={'h6'} className={classes.congratulation}>
          {this.i18n.translate('Congratulation')}
        </Typography>
        <Typography className={classes.centered}>{this.i18n.translate('DescriptionStart')}</Typography>
        <Box m={3} className={classes.centered}>
          <Button variant="contained" color="secondary" onClick={this.onReadMore}>
            {this.i18n.translateToString('ReadMore')}
          </Button>
        </Box>
      </Container>
    );
  }

  private onReadMore = () => {
    this.router.navigate(this.router.linkTo('demoContent'));
  };
}

export default withStyles(HomeStyles, { withTheme: true })(withInject(Home));
