let itemCosts = {
  "coke": 1.5,
  "chips": 1.25,
  "cookies": 2.00,
}

function getItemCostString(itemCosts) {
  let itemCostString = ""
  
  Object.keys(itemCosts).forEach(function(key) {
    itemCostString = itemCostString + key + ": $" + itemCosts[key] + "<br />"
  });
  
  return itemCostString;
}

function getPurchasedItemString(itemsPurchased) {
  let purchasedItemString = "";
  
  Object.keys(itemsPurchased).forEach(function(key) {
    purchasedItemString = purchasedItemString + key + ": " + itemsPurchased[key] + "<br />";
  });
  
  return purchasedItemString;
}

// User setup
let userBalance = 10.00;
let itemsPurchased = {}

Object.keys(itemCosts).forEach(function(key) {
  itemsPurchased[key] = 0;
});

// Page setup
let purchasedItemString = getPurchasedItemString(itemsPurchased);
$(".purchased").html(purchasedItemString);

let itemCostString = getItemCostString(itemCosts);
$(".prices").html(itemCostString);

// Handle purchase
$(".buy").click(function() {
  let itemRequested = $("input").val();
  let itemParsed = itemRequested.toLowerCase();
  
  if (Object.keys(itemCosts).indexOf(itemParsed) < 0) {
    $(".message").html("Sorry, we don't sell that");
  } else {
    if (itemCosts[itemParsed] > userBalance) {
      $(".message").html("Oof, you're broke.");
    } else {
      $(".message").html("Coming right up!");
      
      userBalance = userBalance - itemCosts[itemParsed]
      $(".balanceAmount").html(userBalance);
      
      itemsPurchased[itemParsed] = itemsPurchased[itemParsed] + 1;
      $(".message").append("\nSo far you've bought " + itemsPurchased[itemParsed] + " " + itemParsed);
      
      purchasedItemString = getPurchasedItemString(itemsPurchased);
      $(".purchased").html(purchasedItemString)
    }
  }
});
