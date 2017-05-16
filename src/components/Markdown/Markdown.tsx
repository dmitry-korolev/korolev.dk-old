import * as React from 'react'
import MDJ from 'mdj'
import { NodeItem } from 'mdj'
import { Title, Text, Link } from 'components'

const parser = MDJ()

interface MarkdownProps {
  source: string
}

const textElements = {
  strong: 'strong',
  em: 'em',
  strikethrough: 'del',
  paragraph: 'p',
  code: 'code',
  text: 'span'
}

const processToken = (token: NodeItem): JSX.Element => {
  switch (token.type) {
    case 'heading':
      return <Title level={ token.level }>{ token.children.map(processToken) }</Title>

    case 'blockquote':
      return <blockquote>{ token.children.map(processToken) }</blockquote>

    case 'image':
      return <img src={ token.src } alt={ token.alt } title={ token.title } />

    case 'link':
      return <Link to={ token.href } title={ token.title } >{ token.children.map(processToken) }</Link>

    case 'em':
    case 'paragraph':
    case 'strikethrough':
    case 'strong':
      return <Text tag={ textElements[token.type] }>{ token.children.map(processToken) }</Text>

    case 'code':
    case 'text':
      return <Text tag={ textElements[token.type] }>{ token.value }</Text> // This will be removed in React 16

    case 'br':
      return <br />

    case 'hr':
      return <hr />

    default:
      return null
  }
}

class Markdown extends React.PureComponent<MarkdownProps, {}> {
  public render () {
    return <div>
      { parser.parse(this.props.source).map(processToken) }
    </div>
  }
}

export { Markdown }
