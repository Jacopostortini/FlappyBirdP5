class Utils {

  static inverseRandomGaussian(from, to) {

    const random = randomGaussian();
    while (random == 0) random = randomGaussian();

    const inverse = 1/random;
    const normalized = (atan(inverse*(to-from)/25)*2/PI+1)/2;
    return normalized * (to - from) + from;
  }
}
