import { MarginSafeStyle, MarginStyle } from '../types';
import processBoxModel from './boxModel';

const processMargin = processBoxModel<MarginStyle, MarginSafeStyle>({
  expandsTo: ({ first, second, third, fourth }) => ({
    marginTop: first,
    marginRight: second,
    marginBottom: third,
    marginLeft: fourth,
  }),
  maxValues: 4,
  autoSupported: true,
});

const processMarginVertical = processBoxModel<MarginStyle, MarginSafeStyle>({
  expandsTo: ({ first, second }) => ({
    marginTop: first,
    marginBottom: second,
  }),
  maxValues: 2,
  autoSupported: true,
});

const processMarginHorizontal = processBoxModel<MarginStyle, MarginSafeStyle>({
  expandsTo: ({ first, second }) => ({
    marginRight: first,
    marginLeft: second,
  }),
  maxValues: 2,
  autoSupported: true,
});

const processMarginSingle = processBoxModel<MarginStyle, MarginSafeStyle>({
  autoSupported: true,
});

const handlers = {
  margin: processMargin<'margin'>,
  marginBottom: processMarginSingle<'marginBottom'>,
  marginHorizontal: processMarginHorizontal<'marginHorizontal'>,
  marginLeft: processMarginSingle<'marginLeft'>,
  marginRight: processMarginSingle<'marginRight'>,
  marginTop: processMarginSingle<'marginTop'>,
  marginVertical: processMarginVertical<'marginVertical'>,
};

export default handlers;
