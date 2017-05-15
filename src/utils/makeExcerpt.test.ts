import { expect } from 'chai'
import { makeExcerpt } from './makeExcerpt'

describe('makeExcerpt', () => {
  it('should trunkate input to 300 symbols and add ellipsis', () => {
    expect(makeExcerpt(300)('test')).to.equal('test')

    expect(makeExcerpt(200)(Array(50).join('blabla'))).to.have.length.of.at.most(203)
    expect(makeExcerpt(100)(Array(100).join('blabla'))).to.have.length.of.at.most(103)
    expect(makeExcerpt(5)(Array(200).join('blabla'))).to.have.length.of.at.most(8)
    expect(makeExcerpt(100)(Array(100).join('blabla')).endsWith('...')).to.be.true
  })
})
