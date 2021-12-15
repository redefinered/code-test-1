/* eslint-disable no-undef */

import React from 'react';
import Card from '../src/components/card/card.component';

import renderer from 'react-test-renderer';

it('renders correctly if points property is 99999', () => {
  const tree = renderer.create(<Card points={99999} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly if no points property', () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});
