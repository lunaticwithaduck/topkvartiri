import { ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/nextjs';
import type { ReactNode } from 'react';
import { GlobalStyles } from '../src/design/theme/global';
import { theme } from '../src/design/theme/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: () => ReactNode) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
