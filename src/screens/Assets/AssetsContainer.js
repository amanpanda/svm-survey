import {
  compose,
  setDisplayName,
  withStateHandlers,
  lifecycle,
  withState,
  withProps,
} from 'recompose';
import _ from 'lodash';
import AssetsPresenter from './AssetsPresenter';
import { withSideBar, withAuthRequired, withSurvey } from 'hocs';
import { firestore } from 'utilities/firebase';
import { QuestionTypes, SurveyTypes } from 'constants/survey';
import AssetCategories from 'constants/assetCategories';
const AssetKeys = Object.keys(AssetCategories);

export default compose(
  setDisplayName('AssetsContainer'),
  withSideBar,
  withAuthRequired,
  withState('loading', 'setLoading', false),
  withStateHandlers(() => ({ 
    selectedCategory: '',
    subcategories: [],
  }), {
    selectCategory: () => (menuData) => {
      const {
        item: {
          props: {
            children: {
              props: {
                children,
              },
            },
            index,
          },
        },
      } = menuData;
      return {
        selectedCategory: children,
        subcategories: AssetCategories[AssetKeys[index]].subcategories,
      }
    }
  }),
  withStateHandlers(() => ({ fetchedAssetsMap: {} }), {
    setFetchedAssetsMap: () => fetchedAssetsMap => ({ fetchedAssetsMap }),
  }),
  lifecycle({
    async componentDidMount() {
      const {
        setLoading,
        setFetchedAssetsMap,
      } = this.props;
      this.assetsListener = await firestore.collection('assets').onSnapshot(qs => {
        setLoading(true);
        const fetchedAssets = _.map(qs.docs, (doc, key) => ({
          ...doc.data(),
          documentId: doc.id,
        }));
        const fetchedAssetsMap = {}
        _.forEach(fetchedAssets, fa => {
          fetchedAssetsMap[fa.documentId] = fa;
        });
        setFetchedAssetsMap(fetchedAssetsMap);
        setLoading(false);
      });
    },
    componentWillUnmount () {
      this.assetsListener();
    },
  }),
  withProps(({
    selectedCategory,
    subcategories,
    fetchedAssetsMap,
  }) => {
    const surveyList = _.map(subcategories, (subcategory, key) => {
      const queryField = selectedCategory + ' ' + subcategory;
      if (_.has(fetchedAssetsMap, queryField)) {
        return  { 
          key,
          ...fetchedAssetsMap[queryField],
        };
      } else {
        return {
          key,
          surveyTitle: subcategory,
          numberOfSubmissions: 0,
          questions: [
            {
              questionStatement: 'Please log any details about your submission.',
              type: QuestionTypes.FREE_RESPONSE,
            }
          ],
          surveyType: SurveyTypes.ASSET,
          category: selectedCategory,
          subcategory: subcategory,
        }
      }
    });
    return { surveyList };
  }),
  withSurvey(true),
)(AssetsPresenter);
