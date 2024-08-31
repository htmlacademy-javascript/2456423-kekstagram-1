const effectsSetings = [
  {
    name: 'chrome',
    nameEffect: 'grayscale',
    minValue: 0,
    maxValue: 1,
    startValue: 1,
    step: 0.1,
    unitOfMeasure: ''
  },
  {
    name: 'sepia',
    nameEffect: 'sepia',
    minValue: 0,
    maxValue: 1,
    startValue: 1,
    step: 0.1,
    unitOfMeasure: ''
  },
  {
    name: 'marvin',
    nameEffect: 'invert',
    minValue: 0,
    maxValue: 100,
    startValue: 100,
    step: 1,
    unitOfMeasure: '%'
  },
  {
    name: 'phobos',
    nameEffect: 'blur',
    minValue: 0,
    maxValue: 3,
    startValue: 3,
    step: 0.1,
    unitOfMeasure: 'px'
  },
  {
    name: 'heat',
    nameEffect: 'brightness',
    minValue: 1,
    maxValue: 3,
    startValue: 3,
    step: 0.1,
    unitOfMeasure: ''
  }
];

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const sliderElement = document.querySelector('.effect-level__slider');
const imagePreview = document.querySelector('.img-upload__preview');
const sliderValue = document.querySelector('.effect-level__value');
const scaleControl = document.querySelector('.scale__control--value');

let effectSetting;
let effectNameClass;

const createEffectOnImage = () => {
  const nameEffect = effectSetting.nameEffect;
  const unitOfMeasure = effectSetting.unitOfMeasure;
  const effectValue = Number.isInteger(+sliderElement.noUiSlider.get()) ? +sliderElement.noUiSlider.get() : (+sliderElement.noUiSlider.get()).toFixed(1);
  sliderValue.value = effectValue;
  imagePreview.style.filter = `${nameEffect}(${effectValue}${unitOfMeasure})`;
};

const resetEffects = () => {
  document.querySelector('.img-upload__effect-level').classList.add('visually-hidden');
  effectNameClass = 'effects__preview--none';
  imagePreview.classList.add(effectNameClass);
  imagePreview.removeAttribute('style');
  scaleControl.value = '100%';
};

const onRadioEffectChecked = (evt) => {
  imagePreview.classList.remove(effectNameClass);
  const name = evt.target.value;
  effectSetting = effectsSetings.find((element) => element.name === name);
  if (name === 'none') {
    resetEffects();
    return;
  }

  document.querySelector('.img-upload__effect-level').classList.remove('visually-hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effectSetting.minValue,
      max: effectSetting.maxValue,
    },
    start: effectSetting.startValue,
    step: effectSetting.step,
  });

  document.querySelector('.img-upload__effect-level').classList.remove('visually-hidden');
  effectNameClass = `'effects__preview--${name}'`;
  imagePreview.classList.add(effectNameClass);

  createEffectOnImage();

  sliderElement.noUiSlider.on('update', createEffectOnImage);
};

const onClickButtonScale = ({target}) => {
  let scaleValue = parseInt(scaleControl.value, 10);

  const scaleDown = target.classList.contains('scale__control--smaller');
  const scaleUp = target.classList.contains('scale__control--bigger');

  if (scaleDown && scaleValue > MIN_SCALE_VALUE) {
    scaleValue -= SCALE_STEP;
  } else if (scaleUp && scaleValue < MAX_SCALE_VALUE) {
    scaleValue += SCALE_STEP;
  }

  scaleControl.value = `${scaleValue}%`;
  imagePreview.style.transform = `scale(${scaleValue / 100})`;
};

const imageScaleManage = () => {
  scaleControl.value = '100%';
  imagePreview.style.transform = 'scale(1)';
  document.querySelectorAll('.scale__control').forEach((button) => button.addEventListener('click', onClickButtonScale));
};

const initImageEffect = () => {
  document.querySelector('.img-upload__effect-level').classList.add('visually-hidden');
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
  document.querySelectorAll('.effects__radio').forEach((effect) => effect.addEventListener('click', onRadioEffectChecked));
  imageScaleManage();
};

export { initImageEffect, resetEffects };
