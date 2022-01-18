
class Edge {
    constructor(fromName, toName, distance) {
        this.fromName = fromName;
        this.toName = toName;
        this.distance = distance;
    }
}

class Node {
    constructor(name) {
        this.name = name;
        this.result = Number.MAX_VALUE;
        this.prev = null;
    }
}

class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addEdge(edge) {
        this.edges.push(edge);
    }

    addNode(node) {
        this.nodes.push(node);
    }

    print() {
        console.log('Nodes:');
        console.log('------');
        this.nodes.forEach(n => {
            var prevName = "START";
            if(n.result===Number.MAX_VALUE){
                n.result=undefined;
            }
            if (n.prev) {
                prevName = n.prev.name;
            }
            console.log(n.name, n.result, prevName);
        });
        console.log('------');
        console.log('Edges:');
        console.log('------');
        this.edges.forEach(e => {
            console.log(e.fromName, e.toName, e.distance);
        });
    }    
}

class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(obj) {
        this.queue.push(obj);
    }

    empty() {
        return this.queue.length == 0;
    }

    update() {
        this.queue.sort((a,b) => { 
            if (a.result > b.result) { 
                return -1; 
            } else if (a.result < b.result) { 
                return 1;
            } else { 
                return 0; 
            } 
        });
    }

    poll() {
        return this.queue.pop();
    }

}

class DstMatrix {
    constructor() {
        this.dstMap = {};
        this.conMap = {};
        this.visMap = {};
        this.nodeMap = {};
    }

    add(e) {
        this.dstMap[e.fromName] = this.dstMap[e.fromName] || {};
        this.dstMap[e.toName] = this.dstMap[e.toName] || {};
        this.dstMap[e.fromName][e.toName] = e.distance;
        this.dstMap[e.toName][e.fromName] = e.distance;
        this.conMap[e.fromName] = this.conMap[e.fromName] || [];
        this.conMap[e.fromName].push(e.toName);
        this.conMap[e.toName] = this.conMap[e.toName] || [];
        this.conMap[e.toName].push(e.fromName);
        this.visMap[e.toName] = false;
    }


    addNode(n) {
        this.nodeMap[n.name] = n;
    }

    getNode(n) {
        return this.nodeMap[n];
    }

    getNodes(n) {
        return this.conMap[n];
    }

    getDist(s, t) {
        return this.dstMap[s][t];
    }

    visit(n) {
        this.visMap[n] = true;
    }

    visited(n) {
        return this.visMap[n];
    }
}

class Algorithm {
    constructor(graph, start) {
        this.graph = graph;
        this.start = start;
        this.queue = null;
        this.dstMatrix = null;
    }

    initialize() {
        var s = this.start;
        var q = new Queue();
        var d = new DstMatrix();

        this.graph.nodes.forEach((n) => { 
            if (n.name == s)  {
                n.result = 0;
            } else {
                n.result = Number.MAX_VALUE; 
            }
            q.enqueue(n);
            d.addNode(n);
            n.prev = null;
        });

        this.graph.edges.forEach((e) => {
            d.add(e);
        });



        this.queue = q;
        this.queue.update();
        this.dstMatrix = d;
    }

    execute() {
        try {
            this.initialize();
            while (!this.queue.empty()) {
                var n = this.queue.poll();
                var nodeName = n.name;
                var neighbors = this.dstMatrix.getNodes(nodeName);
                if(neighbors) {
                    for (var i = 0; i < neighbors.length; i++) {
                        if (!this.dstMatrix.visited(neighbors[i])) {
                            var targetNode = this.dstMatrix.getNode(neighbors[i]);
                            var dist = this.dstMatrix.getDist(nodeName, targetNode.name);
                            if (targetNode.result > n.result + dist) {
                                targetNode.result = n.result + dist;
                                targetNode.prev = n;
                            }
                        }
                    }
                }
                this.queue.update();
            }
        } catch (e) {
            throw 'Execution did not succeed. Appears there is a bug in the algorithm...';
        }

    }
}

module.exports = {
    Graph: Graph,
    Algorithm: Algorithm,
    Edge: Edge,
    Node: Node
}