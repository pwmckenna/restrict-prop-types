import React, { Component, PropTypes } from 'react';
import restrict from '../src';
import { mount } from 'enzyme';
import jsdom from 'mocha-jsdom';
import { on, off } from 'console-error-throws-error/toggle';
import assert from 'assert';

describe('restrict-prop-types', () => {
  jsdom();

  before(on);
  after(off);

  it('has a nice display name', () => {
    assert.equal(restrict(() => <noscript />).displayName, 'restrict(Component)', 'restrict should set displayName');
  });

  it('hoists statics', () => {
    const NoScript = () => <noscript />;
    NoScript.CONSTANT = 'constant';
    assert.equal(restrict(NoScript).CONSTANT, NoScript.CONSTANT, 'restrict should hoist constants');
  });

  it('hoists propTypes', () => {
    const NoScript = () => <noscript />;
    NoScript.propTypes = {
      a: PropTypes.string
    };
    assert.equal(restrict(NoScript).propTypes.a, NoScript.propTypes.a, 'restrict should hoist constants');
  });

  it('tests the happy path', () => {
    class NoScript extends Component {
      render() {
        return <noscript />;
      }
    }
    const Container = restrict(NoScript);
    const mounted = mount(<Container />);
    assert.equal(mounted.find(NoScript).length, 1, 'expects a mounted NoScript component');
  });

  it('tests that props without propTypes throw warnings', () => {
    class NoScript extends Component {
      render() {
        return <noscript />;
      }
    }
    const Container = restrict(NoScript);
    let caught = false;
    try {
      mount(<Container a="b" />);
    } catch (err) {
      caught = true;
      assert.equal(err.message, 'Warning: Failed propType: Invalid additional prop(s): [\'a\'] supplied to restrict(NoScript).');
    }
    assert(caught, 'expect an addition prop error to be thrown');
  });

  it('tests that only props without propTypes throw warnings', () => {
    class NoScript extends Component {
      static propTypes = {
        a: PropTypes.any
      };
      render() {
        return <noscript />;
      }
    }
    const Container = restrict(NoScript);
    let caught = false;
    try {
      mount(<Container a="a" b="b" c="c" />);
    } catch (err) {
      caught = true;
      assert.equal(err.message, 'Warning: Failed propType: Invalid additional prop(s): [\'b\', \'c\'] supplied to restrict(NoScript).');
    }
    assert(caught, 'expect an addition prop error to be thrown');
  })
});
