Node *reverse(Node *head){
  Node *curr= head,*prev = NULL,*nextNode=head;
  while(curr){
    nextNode = curr->next;
    curr->next = prev;
    prev = curr;
    curr= nextNode;
  }
  return prev;
}

Node *compute(Node *head){
  if(!head || !head->next)
    return head;
  head = reverse(head);
  // while(head){
  //   cout<<head->data<< " ";
  // }
  // return head;
  Node *curr = head,*maxNode = head;
  while(curr){
    if(curr->data > maxNode->data){
      maxNode->next = curr;
      maxNode = curr;
      // curr=curr->next;
    }
    curr = curr->next;  
  }
  head = reverse(head);
  return head;
}