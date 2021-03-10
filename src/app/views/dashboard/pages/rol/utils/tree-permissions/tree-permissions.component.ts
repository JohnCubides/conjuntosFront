import { Component, OnInit, Input } from '@angular/core';
import { TreePermissions } from 'src/app/core/models/tree-permissions/tree-permissions';

@Component({
  selector: 'app-tree-permissions',
  templateUrl: './tree-permissions.component.html',
  styleUrls: ['./tree-permissions.component.scss']
})
export class TreePermissionsComponent implements OnInit {
  @Input() public nodePermits: TreePermissions;
  @Input() public listNode: TreePermissions[];
  @Input() public validateIsChildren = false;
  @Input() public nextNodeSecond = false;
  @Input() public idNodeFather = '';
  @Input() public nodesListMain: TreePermissions;
  @Input() public disabled: boolean;

  constructor() { }

  ngOnInit() {
    if (this.nodesListMain === null || this.nodesListMain === undefined) {
      this.listNode = [
        this.nodePermits
      ];
      if (this.nodePermits) {
        this.nodePermits.state = this.nodePermits.state === undefined ? false : this.nodePermits.state;
      }
      if (this.nodePermits.sonsPermits) {
        this.stateNodes(this.nodePermits.sonsPermits);
      }
      this.nodesListMain = this.nodePermits;
    }
  }

  private stateNodes(nodes: TreePermissions[]) {
    nodes.forEach(node => {
      node.state = node.state === undefined ? false : node.state;
      if (node.sonsPermits) {
        this.stateNodes(node.sonsPermits );
      }
    });
  }

  public addIdElementNode(node: number): string {
    return this.idNodeFather + node.toString();
  }

  public changesStateToggleSwich(event: any, node: TreePermissions) {
    node.state = event;
    if (node.state && this.nodesListMain.state !== node.state && node.id !== this.nodesListMain.id) {
      this.nodesListMain.state = node.state;
    }
    if (node.sonsPermits) {
      node.sonsPermits.forEach(child => {
        this.changesStateToggleSwich(event, child);
      });
    }
    this.changeStateForNode(this.idNodeFather);
  }

  private changeStateForNode(idNodes: string) {
    const idChildrens = idNodes.length > 1 ? idNodes.substring(2, idNodes.length) : '';
    let nodes: TreePermissions[];
    let strIds = '';
    for (let i = 1; i <= idChildrens.split('').length; i++) {
      const id = idChildrens.substring(i - 1, i);
      let node: TreePermissions = null;
      if (i === 1) {
        node = this.nodesListMain.sonsPermits[id];
      } else {
        node = nodes[id];
      }
      nodes = node.sonsPermits;
      const nodeState = this.validateNodesChildren(nodes);
      if (!node.state && nodeState) {
        node.state = nodeState;
      }
      if (i < idChildrens.split('').length) {
        strIds += id;
      }
    }
    if (strIds !== '') {
      this.changeStateForNode(strIds);
    }
  }

  private validateNodesChildren(listNodes: TreePermissions[]): boolean {
    let isActived = false;
    listNodes.forEach(child => {
      if (child.state) {
        isActived = true;
      }
    });
    return isActived;
  }

  public nodes(index: number, style: string): string {
    if (!this.validateIsChildren && index === 0) {
      return style + (this.listNode.length === 1 ? '-unique' : '');
    }
    return '';
  }

  public secondNodes(): string {
    if (this.listNode.length < 2) {
      return 'one-element';
    }
    return '';
  }
}

