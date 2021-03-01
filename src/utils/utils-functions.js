export function tipoDoPokemon(tipos) {
  try {
    const strTipos = tipos ?? [];
    return strTipos.join(", ");
  } catch (error) {
    console.warn("Não possível converter os tipos do Pokemon", error);
  }
}

export function listarAResistenciaPokemon(arrResistencia) {
  try {
    const resistencia = arrResistencia ?? [];

    const listaDeResistencias = resistencia.map(
      (res) => `${res?.type}: ${res?.value}`
    );

    return listaDeResistencias.join(", ");
  } catch (error) {
    console.warn("Não possível converter as resistência do Pokemon", error);
  }
}

export function listarAFraquezaPokemon(arrFraqueza) {
  try {
    const fraqueza = arrFraqueza ?? [];

    const listaDeFraquezas = fraqueza.map(
      (res) => `${res?.type}: ${res?.value}`
    );

    return listaDeFraquezas.join(", ");
  } catch (error) {
    console.warn("Não possível converter as fraquezas do Pokemon", error);
  }
}
