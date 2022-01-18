##Bug
The bug occurs when a given point has no edges(neighbors), so when we try to get the length of the neighbors array(which 
is undefined), we get an error. The structure of the input has to be that, every point needs to have at least 1 edge.
##Solution
What I would propose to do is, add an if statement at line 170 like this:
```
if(neighbors){
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
```
where we would check if neighbors exist.

If there exists a node with no neighbors, then the result of that node would be Number.MAX_VALUE, which indicates that
the node can't be reached. 

There is also the problem where two or more nodes can be neighbors with each other, but not with the starting point in 
any way. The result of those nodes would Number.MAX_VALUE. For example, lets assume that we have 4 points {A,B,C,D} and 
two edges {A,B} and {C,D}. In this case C and D have no route to A or B, which would lead to the result of 
Number.MAX_VALUE.

At the end I would suggest checking every node's result in the print method, and if it is Number.MAX_VALUE we change it to undefined.

```
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
```

##Steps

Firstly I started analyzing the problem and writing the variables meaning in a note. It was a bit hard to figure it out 
because of the namings. After some time I understood what the algorithm was, but I couldn't find where the bug is,
so I tried using the debugger tool. I tried finding the bug with the debugger, but it was consuming me way too much time,
so I tried to find it by using console.logs. I started by using logs inside the initialize method. I realized that 
everything was fine there, so I continued adding logs inside the execute method. There I found the bug, when I logged the
node, node name and neighbors.