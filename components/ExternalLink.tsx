import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';
import { Href } from 'expo-router';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href  };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          const url = typeof href === 'string' ? href : href.pathname;
          // Open the link in an in-app browser.
          await openBrowserAsync(url);
        }
      }}
    />
  );
}
