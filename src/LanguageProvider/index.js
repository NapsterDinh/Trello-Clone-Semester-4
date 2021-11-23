import * as PropTypes from 'prop-types';
import React from 'react';
import { IntlProvider } from 'react-intl';

class LanguageProvider extends React.Component {
  render() {
    const {language} = this.props;
    const _language = !language || language === 'vi' ? 'vi' : 'en';
    const {messages, children} = this.props;

    return (
      <IntlProvider
        locale={_language}
        key={_language}
        onError={() => {}}
        messages={messages[_language]}
        textComponent={React.Component}
      >
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

LanguageProvider.contextTypes = {
  language: PropTypes.string,
};

export default LanguageProvider;
