'reach 0.1';

export const main =
  Reach.App(
    {},
    [Participant('A', {})],
    (A) => {
      A.only(() => {
        const x = 10e+2;
      });
    });
