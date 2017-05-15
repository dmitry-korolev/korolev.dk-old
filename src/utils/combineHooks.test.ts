import { expect } from 'chai'
import { combineHooks } from './combineHooks'

describe('Should combine hooks objects', () => {
  it('combines hooks, simple', () => {
    const a = {
      find: []
    }
    const b = {
      create: []
    }

    expect(combineHooks(a, b)).to.eql({
      find: [],
      create: []
    })
  })

  it('combines hooks, hard', () => {
    const a = {
      find: [],
      create: [1]
    }
    const b = {
      create: [2]
    }

    expect(combineHooks(a, b)).to.eql({
      find: [],
      create: [1, 2]
    })
  })

  it('combines hooks, sooo hard', () => {
    const a = {
      find: [],
      create: [1]
    }
    const b = {
      create: [2]
    }
    const c = {
      create: [2]
    }
    const d = {
      find: [1, 2, 3]
    }
    const e = {
      find: [4],
      create: [1],
      update: [555]
    }

    expect(combineHooks(a, b, c, d, e)).to.eql({
      find: [1, 2, 3, 4],
      create: [1, 2, 2, 1],
      update: [555]
    })
  })
})
