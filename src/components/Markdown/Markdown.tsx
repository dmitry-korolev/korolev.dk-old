import * as React from 'react'
import MDJ from 'mdj'
import { Title, Text, Link, List } from 'components'

// Models
import { NodeItem } from 'mdj'

const parser = MDJ()

interface IMarkdownProps {
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

    case 'list':
      return <List start={ token.start } ordered={ token.ordered }>{ token.children.map(processToken) }</List>

    case 'listitem':
      return <li>{ token.children.map(processToken) }</li>

    case 'table':
      return <table>
        <tr>
          { token.header.map((item) => <th>{ item }</th>) }
        </tr>
        { token.cells.map((row) => <tr>{ row.map((cell) => <td>{ cell.map(processToken) }</td>) }</tr>) }
      </table>

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

class Markdown extends React.PureComponent<IMarkdownProps, {}> {
  public render () {
    return <div>
      { parser.parse(this.props.source).map(processToken) }
    </div>
  }
}

export { Markdown }
