const tezos = new taquito.TezosToolkit('https://florencenet.smartpy.io/');

function updateStatusUI(status, itemSelector) {
  const bar = $(itemSelector).removeClass().addClass("result-bar");

  if (status == "loading") {
    bar.addClass("result-load").html("Loading...");
  } else if (status == "True") {
    bar.addClass("result-true").html("True");
  } else if (status == "False") {
    bar.addClass("result-false").html("False");
  } else {
    bar.addClass("result-false").html("Error: " + status);
  }
}

function getCertStatus(contractAddress, inputId, outputId) {
  updateStatusUI("loading", outputId);

  return tezos.contract.at(contractAddress).
  then(contract => {
    return contract.storage()
    .then(contractStorage => {
      console.log(JSON.stringify(contractStorage, null, 4));
      const students = contractStorage.certified;
      const inputVal = $(inputId).val();

      const found = students.find(student => student == inputVal);

      if(found !== undefined) {
        updateStatusUI("True", outputId);
      } else {
        updateStatusUI("student not found", outputId);
      }
    })})
    .catch(e => {
      updateStatusUI(e, outputId);
      console.error(e);
    });
}