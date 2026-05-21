import {categories, publicTexts, shopTexts} from './content';
import {CategoryId, StoredAppState, TextItem} from '../types/app';

export function getCategory(categoryId: CategoryId) {
  return categories.find(category => category.id === categoryId) ?? categories[0];
}

export function getLibraryTexts(state: StoredAppState, categoryId: CategoryId): TextItem[] {
  const purchased = shopTexts.filter(text => state.purchasedTextIds.includes(text.id));
  return [...publicTexts, ...purchased, ...state.customTexts].filter(text => text.categoryId === categoryId);
}

export function getAllLibraryTexts(state: StoredAppState): TextItem[] {
  const purchased = shopTexts.filter(text => state.purchasedTextIds.includes(text.id));
  return [...publicTexts, ...purchased, ...state.customTexts];
}
