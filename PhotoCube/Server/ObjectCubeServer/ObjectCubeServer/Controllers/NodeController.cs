﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ObjectCubeServer.Models.DomainClasses;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Threading.Tasks;
using ObjectCubeServer.Models.Contexts;
using ObjectCubeServer.Models.DomainClasses.Tag_Types;
using ObjectCubeServer.Models.PublicClasses;

namespace ObjectCubeServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class NodeController : ControllerBase
    {
        // GET: api/Node
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Node> allNodes;
            await using (var context = new ObjectContext())
            {
                allNodes = context.Nodes
                    .Include(n => n.Children)
                    .ToList();
            }
            return Ok(allNodes);
        }

        // GET: api/Node/5
        [HttpGet("{id:int}", Name = "GetNodes")]
        public async Task<IActionResult> Get(int id)
        {
            Node nodeFound;
            await using (var context = new ObjectContext())
            {
                nodeFound = context.Nodes
                    .Where(n => n.Id == id)
                    .Include(n => n.Tag)
                    .Include(n => n.Children)
                        .ThenInclude(cn => cn.Tag)
                    .FirstOrDefault();
            }
            if (nodeFound == null) { return NotFound(); }
            else
            {
                nodeFound.Children.OrderBy(n => ((AlphanumericalTag)n.Tag).Name);
                nodeFound = await RecursiveAddChildrenAndTags(nodeFound);
                return Ok(nodeFound);
            }
        }

        // GET: api/Node/name=wood
        [HttpGet("name={tag}")]
        public async Task<IActionResult> GetNodeByName(string tag)
        {
            List<Node> nodesFound;
            await using (var context = new ObjectContext())
            {
                nodesFound = context.Nodes
                    .Include(n => n.Tag)
                    .Where(n => ((AlphanumericalTag)n.Tag).Name.ToLower().StartsWith(tag.ToLower()))
                    .ToList();
            }

            if (nodesFound != null)
            {
                var result = new List<PublicNode>();
                foreach (Node node in nodesFound)
                {
                    var publicNode = new PublicNode(node.Id, ((AlphanumericalTag)node.Tag).Name)
                    {
                        ParentNode = await GetParentNode(node)
                    };
                    result.Add(publicNode);
                }
                return Ok(result);
            }
            return NotFound();
        }

        // GET: api/Node/123/Parent
        [HttpGet("{nodeId:int}/parent")]
        public async Task<IActionResult> GetParentNode(int nodeId)
        {
            PublicNode parentNode;
            await using (var context = new ObjectContext())
            {
                var childNode = context.Nodes
                    .FirstOrDefault(n => n.Id == nodeId);
                parentNode = await GetParentNode(childNode);
            }
            return Ok(parentNode);
        }

        // GET: api/Node/123/Children
        [HttpGet("{nodeId}/children")]
        public async Task<IActionResult> GetChildNodes(int nodeId)
        {
            IEnumerable childNodes;
            await using (var context = new ObjectContext())
            {
                childNodes = context.Nodes
                    .Include(n => n.Children)
                    .Where(n => n.Id == nodeId)
                    .Select(n => n.Children.Select(cn => new PublicNode(cn.Id, ((AlphanumericalTag)cn.Tag).Name)))
                    .FirstOrDefault();
            }
            return Ok(childNodes);
        }

        #region HelperMethods:
        private async Task<PublicNode> GetParentNode(Node child)
        {
            PublicNode parentNode;
            await using (var context = new ObjectContext())
            {
                parentNode = context.Nodes
                    .Where(n => n.Children.Contains(child))
                    .Include(n => n.Tag)
                    .Select(n => new PublicNode(n.Id,((AlphanumericalTag)n.Tag).Name))
                    .FirstOrDefault();
            }

            return parentNode;
        }

        private async Task<Node> RecursiveAddChildrenAndTags(Node parentNode)
        {
            List<Node> newChildNodes = new List<Node>();
            foreach(Node childNode in parentNode.Children)
            {
                Node childNodeWithTagAndChildren;
                await using (var context = new ObjectContext())
                {
                    childNodeWithTagAndChildren = context.Nodes
                        .Where(n => n.Id == childNode.Id)
                        .Include(n => n.Tag)
                        .Include(n => n.Children)
                            .ThenInclude(cn => cn.Tag)
                        .FirstOrDefault();
                }
                childNodeWithTagAndChildren.Children.OrderBy(n => ((AlphanumericalTag)n.Tag).Name);
                childNodeWithTagAndChildren = await RecursiveAddChildrenAndTags(childNodeWithTagAndChildren);
                newChildNodes.Add(childNodeWithTagAndChildren);
            }
            parentNode.Children = newChildNodes;
            return parentNode;
        }
        #endregion
    }
}
