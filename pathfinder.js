async function genPath(isAnimated) {
  let alg = getRadioVal(document.getElementById("algForm"), "alg");

  startNode.g = 0;
  if (alg == "astar" || alg == "bfs") {
    startNode.h = dist(startNode, endNode);
  } else if (alg == "dijkstra") {
    startNode.h = 0;
  }
  startNode.f = startNode.g + startNode.h;

  //Starting Node
  let minHeap = new MinHeap();
  minHeap.insert(startNode);
  let finished = false;
  while (minHeap.heap.length > 0) {
    let currentNode = minHeap.peek();

    if (currentNode === endNode) {
      finished = true;
      openSet = minHeap.heap;
      return finished;
    }

    closedSet.push(minHeap.removeMin());

    for (let i = 0; i < currentNode.neighbors.length; i++) {
      let neighbor = currentNode.neighbors[i];

      let tempG = currentNode.g + dist(currentNode, neighbor);

      if (tempG < neighbor.g && !closedSet.includes(neighbor)) {
        neighbor.parent = currentNode;
        if (alg == "bfs") {
          neighbor.g = 0;
        } else {
          neighbor.g = tempG;
        }

        if (alg == "astar" || alg == "bfs") {
          neighbor.h = dist(neighbor, endNode);
        } else if (alg == "dijkstra") {
          neighbor.h = 0;
        }

        neighbor.f = neighbor.g + neighbor.h;
        if (!minHeap.heap.includes(neighbor)) {
          minHeap.insert(neighbor);
        }
      }
    }
    openSet = minHeap.heap;
    if (isAnimated) {
      await sleep(1);
      drawGrid();
    }
  }
  return finished;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function dist(startNode, endNode) {
  return (
    Math.pow(startNode.x - endNode.x, 2) + Math.pow(startNode.y - endNode.y, 2)
  );
}

function removeNode(array, node) {
  let index = array.indexOf(node);
  if (index != -1) {
    array.splice(index, 1);
  }
}
