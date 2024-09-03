const EffectsSetings = [
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
const EFFECT_NONE = 'none';


const imagePreview = document.querySelector('.img-upload__preview');
const effectsRadio = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderFieldset = document.querySelector('.img-upload__effect-level');
const sliderValue = document.querySelector('.effect-level__value');
const scaleControl = document.querySelector('.scale__control--value');
const scaleButtons = document.querySelectorAll('.scale__control');


let activeEffect;
let activeEffectClass;

const createEffectOnImage = () => {
  const nameEffect = activeEffect.nameEffect;
  const unitOfMeasure = activeEffect.unitOfMeasure;
  const effectValue = Number.isInteger(+sliderElement.noUiSlider.get()) ? +sliderElement.noUiSlider.get() : (+sliderElement.noUiSlider.get()).toFixed(1);
  sliderValue.value = effectValue;
  imagePreview.style.filter = `${nameEffect}(${effectValue}${unitOfMeasure})`;
};

const resetEffects = () => {
  sliderFieldset.classList.add('visually-hidden');
  activeEffectClass = 'effects__preview--none';
  imagePreview.classList.add(activeEffectClass);
  imagePreview.removeAttribute('style');
  scaleControl.value = '100%';
  activeEffect = 'null';
};

const onEffectChange = (evt) => {
  imagePreview.classList.remove(activeEffectClass);
  const name = evt.target.value;
  if (name === EFFECT_NONE) {
    resetEffects();
    return;
  }
  activeEffect = EffectsSetings.find((element) => element.name === name);

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: activeEffect.minValue,
      max: activeEffect.maxValue,
    },
    start: activeEffect.startValue,
    step: activeEffect.step,
  });

  sliderFieldset.classList.remove('visually-hidden');
  activeEffectClass = `'effects__preview--${name}'`;
  imagePreview.classList.add(activeEffectClass);

  createEffectOnImage();

  sliderElement.noUiSlider.on('update', createEffectOnImage);
};

const onButtonScaleClick = ({target}) => {
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

const setImageScale = () => {
  scaleControl.value = '100%';
  imagePreview.style.transform = 'scale(1)';
  scaleButtons.forEach((button) => button.addEventListener('click', onButtonScaleClick));
};

const initImageEffect = () => {
  sliderFieldset.classList.add('visually-hidden');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });

  effectsRadio.forEach((effect) => effect.addEventListener('change', onEffectChange));

  setImageScale();
};

export { initImageEffect, resetEffects };
