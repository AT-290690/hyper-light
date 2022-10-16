import {
  compileHtml,
  dashCommentsToSemiComments,
  handleUnbalancedParens,
  interpredHtml,
  run,
} from '../../language/misc/utils.js'
import { elements } from './common.js'

export const logErrorMessage = msg => {
  elements.popupContainer.style.display = 'none'
  elements.canvasContainer.style.display = 'none'
  elements.consoleElement.textContent = msg
}

export const compile = (file, scripts) => {
  try {
    handleUnbalancedParens(file)
    return compileHtml(file, scripts)
  } catch (err) {
    logErrorMessage(err.message)
  }
}

export const interpred = file => {
  try {
    handleUnbalancedParens(file)
    return run(file)
  } catch (err) {
    logErrorMessage(err.message)
  }
}

export const interpredBrowser = (file, to) => {
  try {
    handleUnbalancedParens(file)
    return interpredHtml(dashCommentsToSemiComments(file))
  } catch (err) {
    logErrorMessage(err.message)
  }
}
