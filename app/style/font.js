import { PixelRatio } from 'react-native'

const fontSizeScaler = PixelRatio.get() / PixelRatio.getFontScale()

module.exports = {
  fontSizeScaler,
}
