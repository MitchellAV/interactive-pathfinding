async function genPath(isAnimated) {
  // let startTime = new Date().getTime();
  console.time("A*");
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
  // openSet.push(startNode);
  minHeap.insert(startNode);
  let finished = false;
  while (minHeap.heap.length > 0) {
    // let currentNodeIndex = 0;

    // for (let i = 0; i < openSet.length; i++) {
    //     if (openSet[i] == endNode) {
    //         currentNodeIndex = i;
    //         break;
    //     }
    //     if (openSet[i].f < openSet[currentNodeIndex].f) {
    //         currentNodeIndex = i;
    //     }
    // }

    // let currentNode = openSet[currentNodeIndex];
    let currentNode = minHeap.peek();
    // console.log({currentNode},minHeap.printHeap());

    if (currentNode === endNode) {
      finished = true;
      console.timeEnd("A*");
      openSet = minHeap.heap;
      return finished;
    }
    // removeNode(openSet, currentNode);
    // closedSet.push(currentNode);

    closedSet.push(minHeap.removeMin());

    for (let i = 0; i < currentNode.neighbors.length; i++) {
      let neighbor = currentNode.neighbors[i];
      // if (!closedSet.includes(neighbor)) {
      // if (alg == "bfs") {
      // 	let tempH = dist(currentNode, neighbor);
      // 	if (tempH < neighbor.h) {
      // 		neighbor.parent = currentNode;
      // 		neighbor.g = 0;

      // 		neighbor.h = dist(currentNode, endNode);

      // 		neighbor.f = neighbor.g + neighbor.h;
      // 		if (!minHeap.heap.includes(neighbor)) {
      // 			minHeap.insert(neighbor);
      // 		}
      // 		// if (!openSet.includes(neighbor)) {
      // 		//     openSet.push(neighbor);
      // 		// }
      // 	}
      // } else {
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
        // if (!openSet.includes(neighbor)) {
        //     openSet.push(neighbor);
        // }
      }
      // }

      // }
    }
    // minHeap.printHeap();
    openSet = minHeap.heap;
    // reset();
    if (isAnimated) {
      await sleep(1);
      drawGrid();
    }
  }
  // let endTime = new Date().getTime();
  console.timeEnd("A*");
  return finished;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function dist(startNode, endNode) {
  return (
    Math.pow(startNode.x - endNode.x, 2) + Math.pow(startNode.y - endNode.y, 2)
  );
  // return Math.abs(startNode.x - endNode.x) + Math.abs(startNode.y - endNode.y);
}

function removeNode(array, node) {
  let index = array.indexOf(node);
  if (index != -1) {
    array.splice(index, 1);
  }
}
